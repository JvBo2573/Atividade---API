// A URL da nossa API
const url = "http://localhost:3000/produtos";

/**
 * 1. BUSCAR PRODUTOS (GET)
 */
async function buscarProdutos() {
   try{
    const resposta = await fetch(url);
    const produtos = await resposta.json();

    console.log(produtos);
    
    const container = document.getElementById('lista-produtos');
    let html = ""
    produtos.forEach(produto => {
        html += `
        <div>
            <h1>${produto.nome}</h1>
            <p>${produto.preco}</p>
            <p>${produto.descricao}</p>
        </div>
        `;
    });

    container.innerHTML = html;

   } catch (erro){

    console.log('Não conseguimos encontrar os produtos:', erro);
   }
}

/**
 * 2. SALVAR NOVO PRODUTO (POST)
 */
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async function(evento) {
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;

    const novoProduto = {
        nome : nome,
        preco : preco,
        descricao : descricao
    };

    try {
        const resposta = await fetch(url, {
            method : "post",
            headers: {
                    "Content-Type": "application/json"
                    },
            body: JSON.stringify(novoProduto)
                
        });
                
        const resultado = await resposta.json();
            
        console.log(resultado);

    } catch (error) {
        console.log("Erro ao cadastrar produto:", erro);
    }


});

// Executa a busca de produtos assim que a página abre
buscarProdutos();


