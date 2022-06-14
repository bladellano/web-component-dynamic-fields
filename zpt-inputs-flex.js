class ZptInputsFlex extends HTMLElement {
    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })

        this.typesOfFields = [
            'text',
            'number',
            'date'
        ];

        /* Button add */
        this.createButtonAdd()

        /* Main */
        this.shadow.appendChild(this.style())

        /** Set name button remove */
        this.nameButtomRemove =
            (!!this.attributes.getNamedItem('_nameButtonRemove'))
                ? this.attributes.getNamedItem('_nameButtonRemove').value
                : '&times'

        /** Set name fieldsGrouper */
        this.fieldsGrouper =
            (!!this.attributes.getNamedItem('_fieldsGrouper'))
                ? this.attributes.getNamedItem('_fieldsGrouper').value
                : 'fieldsGrouper'

        /* Rows */
        this.builderRows()

    }

    /* Create button add */
    createButtonAdd() {

        const name =
            (!!this.attributes.getNamedItem('_nameButtonAdd'))
                ? this.attributes.getNamedItem('_nameButtonAdd').value
                : 'add'

        const buttonAdd = document.createElement('a')
        buttonAdd.classList.add('add')
        buttonAdd.innerHTML = name
        buttonAdd.addEventListener('click', (e) => {
            this.builderRows(e)
        });

        this.shadow.appendChild(buttonAdd)
    }

    createButtonRemove() {

        const buttonRemove = document.createElement('a')
        buttonRemove.innerHTML = this.nameButtomRemove
        buttonRemove.classList.add('remove')
        buttonRemove.addEventListener('click', function (e) {
            this.parentElement.remove()
        })

        return buttonRemove
    }

    /** Create lines with fields */
    builderRows() {

        const div = document.createElement('div')

        div.classList.add('line')

        const btnRemove = this.createButtonRemove()

        if (!!this.attributes.getNamedItem('_fieldsGrouper')) {
            this.attributes.removeNamedItem('_fieldsGrouper')
        }

        if (!!this.attributes.getNamedItem('_nameButtonAdd'))
            this.attributes.removeNamedItem('_nameButtonAdd')

        if (!!this.attributes.getNamedItem('_nameButtonRemove'))
            this.attributes.removeNamedItem('_nameButtonRemove')

        const fields = Array.from(this.attributes, (el) => {

            if (this.typesOfFields.indexOf(el.value) != -1) {

                const formGRoup = document.createElement('div')
                formGRoup.classList.add('form_group')

                const label = document.createElement('label')
                label.innerText = el.name[0].toUpperCase() + el.name.substring(1)

                formGRoup.appendChild(label)

                const input = document.createElement('input')
                input.type = el.value;
                input.setAttribute('name', `${this.fieldsGrouper}[${el.name}][]`)

                input.setAttribute('required', true)

                formGRoup.appendChild(input)

                return formGRoup

                /** Type select */
            } else {

                const formGRoup = document.createElement('div')
                formGRoup.classList.add('form_group')

                const label = document.createElement('label')
                label.innerText = el.name[0].toUpperCase() + el.name.substring(1)

                formGRoup.appendChild(label)

                const obj = JSON.parse(el.value)
                const input = document.createElement("select");
                input.setAttribute('name', `${this.fieldsGrouper}[${el.name}][]`)

                let op = document.createElement('option')
                op.text = `Selecione`
                op.value = ''

                input.appendChild(op)

                for (let key in obj.options) {
                    op = document.createElement('option')
                    op.value = String(Object.values(obj.options[key]))
                    op.text = String(Object.keys(obj.options[key]))
                    input.appendChild(op)
                }

                formGRoup.appendChild(input)

                return formGRoup
            }

        })

        fields.forEach(field => div.appendChild(field))
        div.append(btnRemove)
        this.shadow.append(div)

        let wrap = this.parentElement.getAttribute('class');

        let content = document.querySelector(`._${wrap}`)
        content.appendChild(this.shadow)
    }   

    style() {
        const style = document.createElement('style')
        style.textContent = `
            [class^=_] .line{
                display: flex;
            }
            [class^=_] .form_group input,
            [class^=_] .form_group select{
                padding: .8rem .75rem;
                border: 1px solid #ccc;
                margin: 2px 6px;
                border-radius: 4px;
                background-color:#fff;
            }
            
            [class^=_] .form_group select{
                width: 94%;
            }
            [class^=_] .form_group input
            {
                width: 78%;
            }

            [class^=_] .form_group input:focus{
                border: 1px solid #000;
		        outline: none;
            }
            [class^=_] a{
                text-transform: uppercase;
                text-decoration: none;
                padding: .5rem .75rem;
                display: inline-block;
                cursor:pointer;
                border-radius: 6px;
                color: white;
                font-family:'Sans-serif';
            }

            [class^=_] a.remove {
                background-color: #dc3545;
                display: flex;
                align-self: center;
                margin-top: 22px;
            }
            [class^=_] a.remove:hover{
                color: #fff;
                background-color: #c82333;
                border-color: #bd2130;
            }
            [class^=_] a.add{
                background-color:#28a745;
                margin: 6px;
            }
            [class^=_] a.add:hover{
                color: #fff;
                background-color: #218838;
                border-color: #1e7e34;
            }

            [class^=_] .form_group {
            padding: 0 3px 0 0;
            }

            [class^=_] .form_group label {
                display: block;
                font-family:'Sans-serif';
                padding: 0 6px;
                margin-top: 10px;
                font-size: 0.8rem;
            }

            [class^=_] .form_group input {
            }
        `
        return style;
    }
}

customElements.define('zpt-inputs-flex', ZptInputsFlex)