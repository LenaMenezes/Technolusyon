let ul = document.querySelector('nav .ul');

function openMenu() {
    ul.classList.add('open');
}

function closeMenu() {
    ul.classList.remove('open');
}

document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Mensagem enviada com sucesso!'
            });
            this.reset();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: data.errors.map(error => error.message).join(', ')
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Ocorreu um erro no envio da mensagem.'
                    });
                }
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Ocorreu um erro no envio da mensagem.'
        });
        console.error('Erro:', error);
    });
});
