## Componente para passar vários tipos de inputs
```html
<zpt-inputs-flex 
itens[codEntidade][]='{"label":"Cod. Entidade","value":"U","type":"select","options":[{"Unidade/Loja":"U"},{"Fornecedor":"F"},{"Cliente":"C"},{"Funcionário":"I"}]}'>
</zpt-inputs-flex>
```
```html
<zpt-inputs-flex 
disabled
itens[codEntidade][]='Somente string'>
</zpt-inputs-flex>
```
### Estruttura do objeto para passar no valor do atributo:
```json
{"label":"Cod. Entidade","value":"U","type":"select","options":[{"Unidade/Loja":"U"},{"Fornecedor":"F"},{"Cliente":"C"},{"Funcionário":"I"}]}
```

| Label | Value | type | options |disabled |
| :-------- | :------- | :------- | :----- |:----- |
| `string` | `string` | `string`: text/date/number/select |`object` |`attribute` |