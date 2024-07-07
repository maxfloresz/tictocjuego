const Square = ({children, isSelected, updataBoard, index}) =>{
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = ()=>{
        updataBoard(index)
    }
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }

export default Square