class ZptInputsFlex extends HTMLElement {
    constructor() {
        super()

        /** Create a div to expose inputs in regular DOM */
        const showHtml = document.createElement('div');
        this.randomClass = `_${this.generateRandomString(10)}`;
        showHtml.classList.add(this.randomClass)
        this.after(showHtml);

        /* Options Shadow */
        this.shadow = this.attachShadow({ mode: 'open' })

        /* Set the style */
        this.shadow.appendChild(this.style())

        /** Use attribute disabled */
        if (!!this.attributes.getNamedItem('disabled')) {
            this.attributes.removeNamedItem('disabled')
            this.disabled = 'disabled'
        }

        /** Use attribute required */
        if (!!this.attributes.getNamedItem('required')) {
            this.attributes.removeNamedItem('required')
            this.required = 'required'
        }

        /* Create the lines */
        this.builderRows()

    }

    createButtonRemove() {

        const buttonRemove = document.createElement('a')
        buttonRemove.innerHTML = '&times'
        buttonRemove.classList.add('remove')
        buttonRemove.addEventListener('click', function (e) {
            this.parentElement.remove()
        })
        return buttonRemove
    }

    buttonAdd() {
        const btn = document.createElement('a')
        btn.innerHTML = '+'
        btn.classList.add('add')
        btn.addEventListener('click', () => this.builderRows(true))
        return btn
    }

    /** Create lines with fields */
    builderRows(cleanValues = false) {

        const div = document.createElement('div')
        div.classList.add('line')

        const btnRemove = this.createButtonRemove()
        const buttonAdd = this.buttonAdd()

        const fields = Array.from(this.attributes, (el) => {

            let inputValueTypeOptions = '';

            if (this.isJson(el.value))
                inputValueTypeOptions = JSON.parse(el.value);

            let _type = inputValueTypeOptions.type || '';
            let _value = inputValueTypeOptions.value || (!this.isJson(el.value) ? el.value : '');
            let _label = inputValueTypeOptions.label || '';
            let _disabled = this.disabled;
            let _required = this.required;

            if (cleanValues) _value = '';

            const formGRoup = document.createElement('div')
            formGRoup.classList.add('form_group')

            const label = document.createElement('label')
            label.innerText = _label || el.name

            formGRoup.appendChild(label)

            let input = '';

            if (_type == 'select') {
                input = document.createElement('select');
            } else {
                input = document.createElement('input');
                input.type = _type || 'text';
            }

            if (this.disabled && !cleanValues)
                input.setAttribute(_disabled, true);

            if (this.required)
                input.setAttribute(_required, true);

            input.value = _value;
            input.name = el.name;

            if (_type == 'select') {
                let op = document.createElement('option')
                op.text = `--`
                op.value = ''
                input.appendChild(op)

                for (let key in inputValueTypeOptions.options) {
                    op = document.createElement('option')
                    op.value = String(Object.values(inputValueTypeOptions.options[key]))
                    op.text = String(Object.keys(inputValueTypeOptions.options[key]))

                    if (op.value == _value) op.setAttribute('selected', true);

                    input.appendChild(op)
                }
            }

            formGRoup.appendChild(input)

            return formGRoup
        });

        fields.forEach(field => div.appendChild(field))

        if (!this.disabled) {
            div.append(buttonAdd)
            div.append(btnRemove)
        }

        this.shadow.append(div)
        document.querySelector(`.${this.randomClass}`).append(this.shadow);

    }

    style() {
        const style = document.createElement('style')
        style.textContent = `
            .${this.randomClass} .line{
                display: flex;
            }
            .${this.randomClass} .form_group input,
            .${this.randomClass} .form_group select{
                padding: .8rem .75rem;
                border: 1px solid #ccc;
                margin: 2px 6px;
                border-radius: 4px;
                background-color:#fff;
            }
            
            .${this.randomClass} .form_group select{
                width: 94%;
            }
            .${this.randomClass} .form_group input
            {
                width: 78%;
            }
            .${this.randomClass} .form_group input[disabled],
            .${this.randomClass} .form_group select[disabled]
            {
                background:#6663;
            }

            .${this.randomClass} .form_group input:focus{
                border: 1px solid #000;
		        outline: none;
            }
            .${this.randomClass} a{
                text-transform: uppercase;
                text-decoration: none;
                padding: .5rem .75rem;
                margin:0 2px;
                display: inline-block;
                cursor:pointer;
                border-radius: 6px;
                color: white;
                font-family:'Sans-serif';
            }

            .${this.randomClass} a.remove {
                background-color: #dc3545;
                display: flex;
                align-self: center;
                margin-top: 22px;
            }
            .${this.randomClass} a.remove:hover{
                color: #fff;
                background-color: #c82333;
                border-color: #bd2130;
            }
            .${this.randomClass} a.add{
                background-color:#28a745;
                display: flex;
                align-self: center;
                margin-top: 22px;
            }
            .${this.randomClass} a.add:hover{
                color: #fff;
                background-color: #218838;
                border-color: #1e7e34;
            }

            .${this.randomClass} .form_group {
            padding: 0 3px 0 0;
            }

            .${this.randomClass} .form_group label {
                display: block;
                font-family:'Sans-serif';
                padding: 0 6px;
                margin-top: 10px;
                font-size: 0.8rem;
            }

            .${this.randomClass} .form_group input {
            }
        `
        return style;
    }

    generateRandomString(length) {
        var randomString = '';
        var caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            randomString += caracters.charAt(Math.floor(Math.random() * caracters.length));
        }
        return randomString;
    }
    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

customElements.define('zpt-inputs-flex', ZptInputsFlex)