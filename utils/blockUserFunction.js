const blockUserFunction = (user) => {

    if(user?.isBlocked) {

        throw new Error(`Access denied, ${user?.firstName} ${user?.lastName} is blocked`)
    }
}

export default blockUserFunction