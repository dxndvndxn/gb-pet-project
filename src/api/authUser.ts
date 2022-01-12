export default function authUser (api: string) {
    return new Promise<any>(resolve => {
        setTimeout(() => {
            fetch(api)
                .then(data => data.json())
                .then(data => resolve(data))
        }, 1500)
    })
}
