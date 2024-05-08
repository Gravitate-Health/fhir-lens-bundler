export function uploadLenses(data: string, domain: string): Promise<Response> {
    const url = `${domain}/ips/api/fhir/Library`;

    const options = {
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    };

    return fetch(url, options);
}