# TODO List

## Tarefas Prioritárias
- [X] Corrigir bug de cores no formularios de usuarios administrativos.
- [ ] Fazer uma POC da feature de Mídias Sociais, usando JIMP para gerar imagens. (https://chatgpt.com/share/672cd45e-4c74-8002-becd-4327f71813cf)
- [ ] Criar um diretorio e organizar os envios de email. (Conta criarda, esqueci a senha).
- [ ] Pensar na entidade de "Estabelecimentos".
    - **Slug**: URL amigável para o estabelecimento.
    - **Usuário**: Usuário que criou o estabelecimento.
    - **Tipo do Estabelecimento**: ENUM de tipos de estabelecimentos.
    - **Logotipo URL**: Link para a imagem do logotipo.
    - **Nome do Estabelecimento**: Nome oficial do local.
    - **Endereço**:
        - **Rua**: Nome da rua.
        - **Número**: Número do local.
        - **Complemento**: Detalhes adicionais (ex: apto).
        - **Bairro**: Nome do bairro.
        - **Cidade**: Nome da cidade.
        - **Estado**: Sigla do estado.
        - **CEP**: Código postal.
        - **Latitude**: Latitude do local.
        - **Longitude**: Longitude do local.
    - **Instagram**: Handle do Instagram (@).
    - **Telefone (Formatado)**: Número de telefone com máscara e formatação.
    - **Pet Friedly**
    - **Trabalhe Conosco / Vagas / Guardar CVs**
- [ ] Procurar referencias de como fazer o Formulario em Steps e o Website apartir do estabelecimento.


## Melhorias
- [ ] Não deletar usuários. Usar active na entidade de banco de dados.
- [ ] Rever integração da STRIPE, e integrar a opção de cancelamento de plano.
- [ ] Adicionar envio de email para as alterações de planos.
