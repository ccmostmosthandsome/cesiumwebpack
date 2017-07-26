export default {
    methods: {
        getHeader() {
            return {
                'X-Auth-Token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        },
        persistencePost(url,payload) {

            return new Promise((resolve, reject) => {
                let request = new Request(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: this.getHeader(),
                    body: JSON.stringify(payload)
                });

                return fetch(request)
                    .then((response) => {
                        if (response.OK) {
                            return response.json()
                        }
                        reject('posersistence failed', response);
                    })
                    .then((response) => {
                       return  resolve(response);
                    })
                    .catch((response)=>{
                        console.log("Major failure here=>",response);
                    })

            })
        }
    }
}