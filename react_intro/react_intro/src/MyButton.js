function HelloWorld() {
    alert('Hello World');
}

export default function MyButton() {
    return (
        <button onClick={HelloWorld}>I am a button</button>
    );
}