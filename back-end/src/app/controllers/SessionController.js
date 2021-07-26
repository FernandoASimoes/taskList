import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    //VERIFICANDO SE O EMAIL EXISTE
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Usuario não existe' })
    }

    //VERIFICANDO SE A SENHA NÃO ESTÁ CORRETA
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    //LOGANDO USUARIO
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expires,
      })
    })
  }
}

export default new SessionController();