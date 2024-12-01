export default function Page() {
    return <div>Hello World</div>;
}

export function test() {
    return 'test';
}

async function main() {
    const result = await test();
    console.log(result);
}
