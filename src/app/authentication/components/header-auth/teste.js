function gerarNumeros(fn){
    let num = 0;
    setInterval(() => {
        fn(num++);
    }, 3000);
}
gerarNumeros(numero => {
    console.log(`#1 - ${numero*2}`);
});
gerarNumeros(numero => {
    console.log(`#2 - ${numero + 110}`);
});