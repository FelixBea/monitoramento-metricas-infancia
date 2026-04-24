import childrenData from '../data/seed.json';

const childrenService = {
    findAll() {
        return childrenData;
    },
    findById(id: string) {
        return childrenData.find((item) => item.id === id);
    },
};

export default childrenService;