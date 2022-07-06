## Componente para passar vários tipos de inputs
```html
<zpt-inputs-flex 
itens[codEntidade][]='{"label":"Cod. Entidade","value":"U","type":"select","options":[{"Unidade/Loja":"U"},{"Fornecedor":"F"},{"Cliente":"C"},{"Funcionário":"I"}]}'>
</zpt-inputs-flex>
```
```html
<zpt-inputs-flex 
itens[codEntidade][]='Somente string'>
</zpt-inputs-flex>
```

| Label | Value | type | options |
| :-------- | :------- | :------- | :----- |
| `string` | `string` | `string` |`object` |