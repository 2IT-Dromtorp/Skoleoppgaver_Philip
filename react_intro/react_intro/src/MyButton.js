function HelloWorld() {
   prompt('Test');
}

export default function MyButton() {
    return (
        <button onClick={HelloWorld}>I am a button</button>
    );
}