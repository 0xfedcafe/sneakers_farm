
module.exports = (usersRepository) => {
  return async (req, res, next) => {
    console.log(req.headers);
    console.log(req.session.user_id);
    if(req.session.user_id){
      const user = await usersRepository.find({user_id: req.session.user_id},{limit:1})

      if (user) {
        req.user = user
        next();
      }
      else res.status(401).json({ error: 'Unauthorized' })
    }
    else{
      res.status(401).json({ error: 'Unauthorized' })
    }
  }
}
