import jwt from "jsonwebtoken"

//assincrona
const createUserToken = async (usuario, request, response) => {
    //Criar o TOKEN
    // Chamar o jwt, nossa biblioteca
    //sign = responsavel em criar o token
    const token = jwt.sign(
        {
            nome: usuario.nome,
            id: usuario.usuario_id,
        },
        "SENHASUPERSEGURAEDIFICIL" // senha
    )

    //Resposta/retornar o TOKEN
    response.status(200).json({
        message: "Você esta logado!",
        token: token,
        usuarioId: usuario.usuario_id,
    })
}

export default createUserToken