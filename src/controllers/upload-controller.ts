export async function uploadLenses(data: string, domain: string): Promise<Response> {
    const baseUrl = `${domain}/fhir/Library`;

    const dataJson = JSON.parse(data);

    const response = await fetch(`${baseUrl}?name:exact=${dataJson.name}`, {
        method: 'GET'
    })

    const responseBody = await response.json();

    if (response.status === 200 && responseBody.total > 0) {

        const options = {
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        };

        return fetch(`${baseUrl}/${responseBody.entry[0].resource.id}`, options);

    }

    const options = {
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    };

    return fetch(baseUrl, options);

}
