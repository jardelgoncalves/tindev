import Dev from '../models/DevSchema'

export default {
  async store (req, res) {
    const { user } = req.headers
    const { devId } = req.params

    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(devId)

    if (!targetDev) {
      return res.status(400).json({ error: 'Usuário não encontrado!' })
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      console.log('deu match')
    }

    if (!loggedDev.likes.includes(targetDev._id)) {
      loggedDev.likes.push(targetDev._id)
      await loggedDev.save()
    }
    return res.json(loggedDev)
  }
}
