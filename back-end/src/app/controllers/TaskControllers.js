import * as Yup from 'yup';
import Task from '../models/Tesk';

class TaskController {
  //CRIA NOVAS TAREFAS
  async store(req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha ao Cadastar Task' });
    };

    const { task } = req.body;
    const tasks = await Task.create({
      user_id: req.userId,
      task,
    })
    return res.json(tasks)
  }

  //LISTA TODOS AS TAREFAS NÃO CONCLUIDAS
  async index(req, res) {
    const tasks = await Task.findAll({
      where: { user_id: req.userId, chack: false }
    })

    res.json(tasks);
  };

  //ATUALIZA A TAREFA PARA CONCLUIDA
  async update(req, res) {
    const { task_id } = req.params;
    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: 'Tarefa não existe' });
    };

    await task.update(req.body);

    return res.json(task);
  };

  //EXCLUINDO TASK
  async delete(req, res) {
    const { task_id } = req.params;
    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: 'Tarefa não existe' });
    };

    if (task.user_id !== req.userId) {
      return res.status(401).json({ error: 'Você não tem autorização para excluir essa tarefa' });
    }

    await task.destroy();

    return res.json({ success: 'Taks excluida com sucesso' });
  }
}

export default new TaskController();