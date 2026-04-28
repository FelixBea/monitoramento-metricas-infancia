export interface Child {
    id: String;
    nome: String;
    data_nascimento: String;
    bairro: String;
    responsavel: String;
    saude: {
        ultima_consulta: String;
        vacinas_em_dia: Boolean;
        alertas: String[];
    },
    educacao: {
        escola: String;
        frequencia_percent: Number;
        alertas: String[];
    },
    assistencia_social: {
        cad_unico: Boolean,
        beneficio_ativo: Boolean,
        alertas: String[];
    },
    revisado: Boolean,
    revisado_por: String,
    revisado_em: String,
}

export interface ChildrenListProps {
    childrenList: Child[];
}