// shift + alt + seta para baixo: duplicar a linha

const transacaoUl = document.querySelector('#transacoes')           //Recebendo a referência da ul
const exibindoReceita = document.querySelector('#dinheiro-mais')    //Inserindo informações no DOM - Receita - 4
const exibindoDespesa = document.querySelector('#dinheiro-menos')   //Inserindo informações no DOM - Despesa - 4
const exibindoTotal = document.querySelector('#balanco')            //Inserindo informações no DOM - Total   - 4      

const form = document.querySelector('#form')                        //Recebendo a referência do formulário - 5 
const nomeTransacaoEntrada = document.querySelector('#text')        //Recebendo a referência do input - 6
const valorTransacaoEntrada = document.querySelector('#quantia')    //Recebendo a referência do input - 6

//console.log({ exibindoReceita, exibindoDespesa, exibindoTotal  }) Testando como objeto

/*
Objetos dentro de um Array
let transacao = [ 
{ id: 1, name: 'Bolo de brigadeiro', quantia: -20 },
{ id: 2, name: 'Salário', quantia: 300 },
{ id: 3, name: 'Torta de frango', quantia: -10 },
{ id: 4, name: 'Violão', quantia: 150 }
]
*/


//Armazenamento das Transações Realizadas para Aramzenamento no Local Storage - 9
const localArmazenamentoTransacoes = JSON.parse(localStorage
    .getItem('transacao'))
let transacao = localStorage
    .getItem('transacao') !== null ? localArmazenamentoTransacoes : []

//Remoção de Transações, que tem o ID diferente da transação que foi clicado. 
const removeTransacao = ID => {
  transacao = transacao.filter(transacao => 
    transacao.id !== ID)
    atualizarLocalArmazenamento()
  inicio()  
}

//Função de adiciona as transações no DOM - 1
const addTransacoesNoDom = ({quantia, name, id}) => {
  const operacao = quantia < 0 ? '-' : '+'             //Execução de ternário: Se true: string(-). Se false: string(+)
  const CSSClass = quantia < 0 ? 'menos' : 'mais'      //Execução de ternário
  const valorSemOperacao = Math.abs(quantia).toFixed(2)//Metodo abs retorna o valor absoluto do numero, mesmo se for positivo ou negativo
  const li = document.createElement('li')              //Criando um novo elemento HTML, atraves do metodo do document

  li.classList.add(CSSClass)                           //Adicionando a classe(CSSClass) na li  
  li.innerHTML = `                                          
    ${name} 
    <span>${operacao} R$ ${valorSemOperacao}</span>
    <button class="delete-btn" onClick="removeTransacao(${id})">x</button>
  `                                                     //String (Template String ) é convertida para HTML no momento da inserção



 //transacaoUl.innerHTML = li ===> [object HTMLLIElement] Retorna esse erro, porque ela não é String e sim objeto do JS
  transacaoUl.append(li)                               //Recebe o elemento como último filho desse elemento ul que ele for encadeado
}

//Funções para Refatoração da Função atualizaValorSaldo - 3
const pegaDespesas = transacaoQuantia => Math.abs(transacaoQuantia
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)
const pegaReceita = transacaoQuantia => transacaoQuantia
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2) 
const pegaTotal = transacaoQuantia => transacaoQuantia
    .reduce((accumulator, transacao) => accumulator + transacao, 0)
    .toFixed(2)       

//Função que atualiza o valor das transações na tela (Saldo, Receitas e Despesas).  - 3
const atualizaValorSaldo = () => {
  const transacaoQuantia = transacao.map(({quantia}) => quantia)               //os valores são armazenados em um array
  const total = pegaTotal(transacaoQuantia)
  const receita =  pegaReceita(transacaoQuantia)                   
  const despesas = pegaDespesas(transacaoQuantia)
    
    //Exibindo na tela saldo, receita e despesa
    exibindoTotal.textContent = `R$ ${total}`
    exibindoReceita.textContent = `R$ ${receita}`
    exibindoDespesa.textContent = `R$ ${despesas}`

  //console.log(despesas)
}

/* Função que executa o preenchimento das informações do estado da aplicação, quando a pagina for carregada. - 2 
Add as transações no DOM. 
*/
const inicio = () => {
  transacaoUl.innerHTML = ''                            //Limpando a ul, para evitar duplicação nas transações
  transacao.forEach(addTransacoesNoDom)
  atualizaValorSaldo()
}

inicio()

//Função para adicionar Transação no Local Storage - 10
const atualizarLocalArmazenamento = () =>  {
  localStorage.setItem('transacao', JSON.stringify(transacao));           //Salvar a informação no LocalStorage [array de objetos - formato de String]
}

//Gerando os ids automaticamente de forma aleatoria - 8
const geradorID = () => Math.round(Math.random() * 1000)                  //Geração aleatoria de IDs de 0 a 1000 

const adicionarTransacaoArray = (transacaoNome, transacaoQuantia) => {
  transacao.push({ 
    id: geradorID(), 
    name: transacaoNome, 
    quantia: Number(transacaoQuantia)                                     //Invocando a função Number, para retorno numerico 
  })
}

// Função de Limpeza dos Inputs - 8
const limparInputs = () => {
  nomeTransacaoEntrada.value = ''
 valorTransacaoEntrada.value = ''
}

//Escutando os eventos - Função que faz o envio do formulário - 6
const enviarFormulario =  event => {
  event.preventDefault()
  //Refatoração:
  const transacaoNome = nomeTransacaoEntrada.value.trim()                  //Armazenando nome da transação - 7
  const transacaoQuantia = valorTransacaoEntrada.value.trim()              //Armazenando valor da transação - 7
  const entradaVazia = transacaoNome === '' || transacaoQuantia === ''

  //Caso um dos inputs não estejam preenchidos será exibido uma mensagem - 7
  if (entradaVazia) {
    alert('Por favor, preencha tanto o nome quanto o valor da transação.')
    return
  }
  //Funções sendo invocadas
  adicionarTransacaoArray(transacaoNome, transacaoQuantia)
  inicio()
  atualizarLocalArmazenamento()
  limparInputs()

}

//Função de envio para o Formulario - 6
form.addEventListener('submit', enviarFormulario)



// addTransacoesNoDom(transacao[2])
// addTransacoesNoDom(transacao[1])













//ClaudiaAmora1820

//sodexo: Claudi@Amor@1820