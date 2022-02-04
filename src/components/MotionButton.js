import { Button, Divider } from "@material-ui/core"
import { motion } from "framer-motion"

function MotionButton({ title, handler }) {

  return (
    <Button className="px-5 budget-header mx-2" onClick={handler}>
      <motion.div whileHover={{ scale: 1.075 }} whileTap={{ scale: 0.8 }} className='h-100'>{title}</motion.div>
    </Button>
  )
}

function CardHeader({ title }) {

  return (
    <>
      <h3><strong>{title}</strong></h3>
      <Divider />
    </>
  )
}

export { MotionButton, CardHeader }