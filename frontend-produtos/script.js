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
            <button onclick="excluirProduto(${produto.id})">Excluir</button>
        </div>
        `;
    });

    container.innerHTML = html;
    const produto = await resposta.json();
    alert(produto.mensagem);

   } catch (error){

    console.log('Não conseguimos encontrar os produtos:', erro);
   }
}



/**
 * 2. SALVAR NOVO PRODUTO (POST)
 */
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async function(evento) {

    evento.preventDefault();

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
                
        const produtos = await resposta.json();
        alert(produtos.mensagem);
        buscarProdutos();

    } catch (error) {
        console.log("Erro ao cadastrar produto:", error);
    }

});


/**
 * 3. BUSCAR PRODUTOS POR ID (GET)
 */

const formularioBuscar = document.getElementById('formularioBuscar');

formularioBuscar.addEventListener("submit", async function(evento) {

    evento.preventDefault();

    const id = formularioBuscar.querySelector("input").value;

    try {

        const resposta = await fetch(`http://localhost:3000/produtos/${id}`);

        const produtos = await resposta.json();
        if (!resposta.ok) {
            alert(produtos.mensagem);
            return;
        }
        
        console.log(produtos);

        const container = document.getElementById('lista-produtos');

        container.innerHTML = `
            <div>
                <h1>${produtos.nome}</h1>
                <p>Preço: R$ ${produtos.preco}</p>
                <p>${produtos.descricao}</p>
                <button onclick="excluirProduto(${produtos.id})">Excluir</button>
            </div>
        `;

    } catch (erro) {
        console.log('Não conseguimos encontrar o produto:', erro);
    }

});

/**
 * 4. DELETAR PRODUTO POR BUSCA (DELETE)
 */

async function excluirProduto(id) {
    try{
        const resposta = await fetch(`http://localhost:3000/produtos/${id}`,{
            method: 'DELETE'
        });
        
        const produtos = await resposta.json();
        alert(produtos.mensagem);
        buscarProdutos();
    
    } catch (erro) {
        console.log('Erro:', erro);
    }
    
}
