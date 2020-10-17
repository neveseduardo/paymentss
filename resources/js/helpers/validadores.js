export default {
    cpf(cpf) {
        let numeros
        let digitos
        let soma
        let resultado
        let digitos_iguais = 1

        cpf = cpf
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
        cpf = cpf.trim()

        if (cpf.length < 11) {
            return false
        }

        for (let i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = 0
                break
            }
        }

        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9)
            digitos = cpf.substring(9)
            soma = 0

            for (let i = 10; i > 1; i--) {
                soma += numeros.charAt(10 - i) * i
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

            if (resultado != digitos.charAt(0)) {
                return false
            }

            numeros = cpf.substring(0, 10)
            soma = 0

            for (let i = 11; i > 1; i--) {
                soma += numeros.charAt(11 - i) * i
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

            if (resultado != digitos.charAt(1)) {
                return false
            }

            return true
        } else {
            return false
        }
    },

    cnpj(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '')
        if (cnpj == '') return false
        if (cnpj.length != 14) {
            return false
        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false

        // Valida DVs
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho)
        var digitos = cnpj.substring(tamanho)
        var soma = 0
        var pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) {
                pos = 9
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(0)) {
            return false
        }

        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) {
                pos = 9
            }
        }

        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(1)) {
            return false
        }

        return true
    },

    somenteNumero(evt) {

        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);

        var regex = /^[0-9.]+$/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();

        }
    },

}
