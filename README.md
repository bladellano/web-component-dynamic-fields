# Componente para passar vários tipos de inputs
Componente para ser utilizado dentro de um formulário, para criar vários campos e para necessidade de criar mais de uma linha dos mesmos tipos de campos configurados.
### Passagem de valor básica:
```html
<zpt-inputs-flex 
disabled
required
itens[codEntidade][]='Valor do campo'>
</zpt-inputs-flex>
```
### Passagem de valores definido nome do `Label` o passando `Value`:
```html
<zpt-inputs-flex 
disabled
required
itens[descricao][]='{"label":"Descrição","value":"Lorem Ipsum"}'
itens[qtde][]='{"label":"Quantidade","type":"number","value":"100.00"}'
>
</zpt-inputs-flex>
```
Passagem de valor do tipo objeto, definido `Label`, `Type` e valor do Tipo `Object`:
```html
<zpt-inputs-flex 
itens[codEntidade][]='{"label":"Cod. Entidade","value":"U","type":"select","options":[{"Unidade/Loja":"U"},{"Fornecedor":"F"},{"Cliente":"C"},{"Funcionário":"I"}]}'>
</zpt-inputs-flex>
```
### Estrutura do `objeto` para passar no valor do atributo:
```json
{
  "label": "Cod. Entidade",
  "value": "U",
  "type": "select",
  "options": [
    { "Unidade/Loja": "U" },
    { "Fornecedor": "F" },
    { "Cliente": "C" },
    { "Funcionário": "I" }
  ]
}
```
- Observe que existe um valor atribuído para a chave `value:"U"`, o resultado será que o select ficará selecionado neste valor automáticamente.
### Detalhes do componente:
| Label | Value | type | options |disabled | required |
| :-------- | :------- | :------- | :----- |:----- |:----- |
| `string` | `string` | `string`: text/date/number/select |`object` |`attribute` | `attribute` |