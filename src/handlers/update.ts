import prisma from "../db"
export const updateOne = async (req, res) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id
        }
    })
    res.json({ data: update })
}
export const getUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.json({ data: updates })
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        return res.json({ message: "nope" })
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: { id: product.id } }
        }
    })

    res.json({ data: update })
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.json({ message: "nope" })
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    res.json({ data: updated })
}

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.json({ message: "nope" })
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({ data: deleted })
}