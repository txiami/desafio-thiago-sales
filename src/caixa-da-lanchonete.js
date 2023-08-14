/*
Busquei criar um código adaptativo, dividindo o menu em "principais","extras" 
e "combos". Isso permite acomodar mudanças futuras no cardápio. Em vez de 
depender apenas da categoria "extras", implementei verificações específicas. 
Por exemplo, para "chantilly", confirmo se o item principal ("café") foi pedido antes. 
Similarmente, para "queijo", verifico se o item principal ("sanduíche") foi solicitado. 
Essa abordagem flexível e organizada atende ao desafio atual e prevê possíveis expansões 
futuras.
*/ 

class CaixaDaLanchonete {
  constructor() {
    this.menu = {
      principais: {
        cafe: 3.00,
        suco: 6.20,
        sanduiche: 6.50,
        salgado: 7.25,
      },
      extras: {
        chantily: 1.50,
        queijo: 2.00,
      },
      combos: {
        combo1: 9.50,
        combo2: 7.50,
      },
    };
  }

  getCategoriaItem(codigo) {
    const categorias = ['principais', 'extras', 'combos'];
    for (const categoria of categorias) {
      if (codigo in this.menu[categoria]) {
        return categoria;
      }
    }
    return null;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const formasDePagamento = {
      dinheiro: 0.95,
      credito: 1.03,
      debito: 1.00,
    };

    if (!formasDePagamento[metodoDePagamento]) {
      return 'Forma de pagamento inválida!';
    }

    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    let valorTotal = 0;
    let itensPrincipais = {};
    let itensExtras = {};

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',');
      const categoria = this.getCategoriaItem(codigo);

      if (!categoria) {
        return 'Item inválido!';
      }
      if (quantidade <= 0) {
        return 'Quantidade inválida!';
      }

      const valorItem = this.menu[categoria][codigo];


      
      if (categoria === 'extras') {
        if (codigo === 'chantily') {
          if (!itensPrincipais['cafe']) {
            return `Item extra não pode ser pedido sem o principal`;
          }
        } else if (codigo === 'queijo') {
          if (!itensPrincipais['sanduiche']) {
            return `Item extra não pode ser pedido sem o principal`;
          }
        }
        
        itensExtras[codigo] = (itensExtras[codigo] || 0) + parseInt(quantidade);
      } else {
        itensPrincipais[codigo] = (itensPrincipais[codigo] || 0) + parseInt(quantidade);
      }




      valorTotal += valorItem * quantidade;
    }

    valorTotal *= formasDePagamento[metodoDePagamento];

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };

