import mongoose, { Model } from 'mongoose';
import childrenData from '../data/seed.json';
import { connectDatabase } from '../config/mongodb';
import { NotFoundError } from '../middleware/errorHandler';

const childSchema = new mongoose.Schema({
    id: String,
    nome: String,
    data_nascimento: String,
    bairro: String,
    responsavel: String,
    saude: {
        ultima_consulta: String,
        vacinas_em_dia: Boolean,
        alertas: Array,
    },
    educacao: {
        escola: String,
        frequencia_percent: Number,
        alertas: Array,
    },
    assistencia_social: {
        cad_unico: Boolean,
        beneficio_ativo: Boolean,
        alertas: Array,
    },
    revisado: Boolean,
    revisado_por: String,
    revisado_em: String,
});

let childrenModel: Model<any> | null = null;

const setupDatabase = async () => {
    if (childrenModel) {
        console.log('childrenModel already assigned: ', childrenModel);
        return;
    }
    await connectDatabase();
    const Child = mongoose.model('Child', childSchema);
    childrenModel = Child;

    // check if the database already has children data stored
    const isChildCreated = await Child.findOne({ id: 'c001' });
    console.log("isChildCreated: ", isChildCreated);
    if (isChildCreated?.id) {
        console.log("children model already exists in db");
        return;
    }
    await Child.create(childrenData as any);
    console.log('childrenModel: ', isChildCreated);
};

const childrenRepository = {
    async findAll() {
        await setupDatabase();
        const data = await childrenModel?.find({});
        console.log('data found: ', data);
        return data;
    },
    async findById(id: string) {
        await setupDatabase();
        const data = await childrenModel?.find({ id });
        console.log('data found: ', data);
        if (!data?.length) {
            throw new NotFoundError();
        }
        return data[0];
    },
    async reviewById(id: string, payload: any) {
        await setupDatabase();
        const { revisado, revisado_por, revisado_em } = payload;
        await childrenModel?.updateOne({ id }, { revisado, revisado_por, revisado_em });
    },
};

export default childrenRepository;
