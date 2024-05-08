export function uploadLenses(data: string, domain: string): void {
    const jsonData = JSON.parse(data);
    const url = `${domain}/ips/api/fhir/Library`;

    const options = {
        body: jsonData,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    };

    fetch(url, options);
}