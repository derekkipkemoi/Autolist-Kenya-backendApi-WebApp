const User = require('../models/user')
const Payment = require('../models/payment')

module.exports = {
    carPayments: async(req, res, next) =>{
        const {paymentMessage} = req.value.body
        const messageToken = await Payment.findOne({"paymentMessage":paymentMessage.replace(/\s/g, '')})

        if(messageToken){
            const message = "Please use a valid message"
            return res.status(200).json({message})
        }

        const {userId} = req.value.params
        const user = await User.findById(userId)
        if(!user){
            const message = "User does not exist"
            return res.status(200).json({message})
        }

        const payment = new Payment(req.value.body)
        payment.payer = user.id
        payment.paymentMessage = paymentMessage.replace(/\s/g, '')
        user.payments.push(payment)
        await user.save()
        await payment.save()

        const message = "Payments confirmed successfully"
        res.status(200).json({message})
    },

    //Validation: Done
  getUserPayments: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate("payments");
    res.status(200).json(user.payments);
  },
}

