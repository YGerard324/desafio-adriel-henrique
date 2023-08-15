/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
class CaixaDaLanchonete {
  constructor() {
    // Inicialização do cardápio com itens e preços
    this.cardapio = [
      { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
      { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
      { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
      { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
      { codigo: 'queijo', descricao: 'Queijo(extra do Sandíche)', valor: 2.00 },
      { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
      { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    ];

    this.descontoDinheiro = 0.05; // 5% de desconto para pagamento em dinheiro
    this.acrescimoCredito = 0.03; // 3% de acréscimo para pagamento a crédito
  }

  calcularValorDaCompra(formaDePagamento, itens) {
        if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
        }

    let valorTotal = 0;
    // Iteração pelos itens do pedido
    for (const itemPedido of itens) {
      const [codigo, quantidade] = itemPedido.split(',');
      const itemCardapio = this.cardapio.find((item) => item.codigo === codigo);

      if (itemCardapio) {
        valorTotal += itemCardapio.valor * parseInt(quantidade);
      } else {
        return 'Item inválido!';
      }
    }
    // Determina o método de pagamento
    const retornoMetodoDePagamento = this.metodoDePagamento(formaDePagamento);
    if (retornoMetodoDePagamento === 'Forma de pagamento inválida!') {
      return retornoMetodoDePagamento;
    }
    // Validação de itens extras no pedido
    if (itens.find((item) => item.replace(/[^a-zA-Z]/g, '') === 'chantily')
        || itens.find((item) => item.replace(/[^a-zA-Z]/g, '') === 'queijo')) {
      const retornoValidaExtra = this.validaExtra(itens);
      if (retornoValidaExtra === 'Item extra não pode ser pedido sem o principal') {
        return retornoValidaExtra;
      }
    }
    // Valida a quantidade dos itens no pedido
    const validQtd = this.validaQuantidade(itens);
    if (!validQtd) {
      return 'Quantidade inválida!';
    }
    // Calcula o desconto ou acrescmo de acordo com o metodo de pagamento
    if (formaDePagamento === 'dinheiro') {
      valorTotal -= valorTotal * this.descontoDinheiro;
    } else if (formaDePagamento === 'credito') {
      valorTotal += valorTotal * this.acrescimoCredito;
    }

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }

  // Função que determina o método de pagamento
  metodoDePagamento(metodo) {
    if (metodo !== 'dinheiro' && metodo !== 'credito' && metodo !== 'debito') {
      return 'Forma de pagamento inválida!';
    }
  }

  // Função que valida a inclusão de itens extras no pedido
  validaExtra(itens) {
    if (itens.find((item) => item.replace(/[^a-zA-Z]/g, '') === 'chantily')
         && itens.find((item) => item.replace(/[^a-zA-Z]/g, '') === 'cafe')) {
      return true;
    } if (itens.find((item) => item.replace(/[^a-zA-Z]/g, '') === 'queijo')
        && itens.find((item) => item.replace(/[^a-zA-Z]/g, '') === 'sanduiche')) {
      return true;
    }
    return 'Item extra não pode ser pedido sem o principal';
  }

  // Função que valida a quantidade dos itens no pedido
  validaQuantidade(itens) {
    for (const item of itens) {
      if (Number.isInteger(parseInt(item))) {
        return false;
      }
      const [quantidade] = item.split(',');

      if (!Number.isInteger(parseInt(quantidade)) || parseInt(quantidade) <= 0) {
        return false; // Retorna false se a quantidade for inválida
      }
    }

    return true; // Retorna true se todas as quantidades forem válidas
  }
}
// Exporta a classe
// eslint-disable-next-line import/prefer-default-export
export { CaixaDaLanchonete };
