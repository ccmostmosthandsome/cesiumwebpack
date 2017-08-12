export default {
    methods: {
        makeGridDataStructure(storeid, data) {
            let columns = data.reduce((acc, curr) => {
                Object.keys(curr).forEach(key => {
                    !acc[key] ? acc.sum++ : acc = acc;
                    !acc[key] ? acc[key] = { "display": key, "sort": false, "order": acc.sum } : acc[key] = acc[key];

                });

                return acc;
            }, { sum: 0, storeid: storeid })

            let rows = data.map((entry) => {

                return _.pick(entry, Object.keys(columns));

            });

            console.log("dingo");
            this.$store.dispatch('changeColumns', { name: columns });
            this.$store.dispatch('changeRows', { name: { storeid: storeid, rows: rows } });
            return this.$store.getters.getColState(storeid)
        }
    }
}