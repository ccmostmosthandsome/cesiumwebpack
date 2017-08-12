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
                        if (response.ok) {
                            return response.json()
                        }
                        return resolve('posersistence failed', response);
                    })
                    .then((response) => {
                       return  resolve(response);
                    })
                    .catch((response)=>{
                        console.log("Major failure here=>",response);
                        return resolve(response);
                    })

            })
        },
        persistencePut(url,payload) {

            return new Promise((resolve, reject) => {
                let request = new Request(url, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: this.getHeader(),
                    body: JSON.stringify(payload)
                });

                return fetch(request)
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                        return resolve('persistence failed', response);
                    })
                    .then((response) => {
                       resolve(response);
                    })
                    .catch((response)=>{
                        console.log("Major failure here=>",response);
                        return resolve(response);
                    })

            })
        },
        persistenceGet(url,parameters){
            return new Promise((resolve,reject)=>{
                let request = new Request(url + parameters, {
                    method: 'GET',
                    mode: 'cors',
                    headers: this.getHeader()
                });

                return fetch(request)
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                        return reject('get failed', response);
                    })
                    .then((response) => {
                       return  resolve(response);
                    })
                    .catch((response)=>{
                        console.log("Major failure here=>",response);
                        return resolve(response);
                    })
            })
        }
    }
}