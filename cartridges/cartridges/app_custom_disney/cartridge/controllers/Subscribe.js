'use strict'


const server = require('server');

var subscribeForm = server.forms.getForm('subscribe');



server.get('Start',(req,res,next)=>{

   subscribeForm.clear();
    res.render('forms/subscribe',{subscribeForm:subscribeForm});

    next();


});




server.post('HandleSub',(req,res,next)=>{

    var Transaction = require('dw/system/Transaction');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');


    Transaction.begin();

    if(validateEmail(subscribeForm.email.value)){

    try {
        var CustomObject = CustomObjectMgr.createCustomObject('disneySub',subscribeForm.email.value);
        
        CustomObject.custom.firstName = subscribeForm.firstName.value;
        CustomObject.custom.lastName = subscribeForm.lastName.value;
        CustomObject.custom.phone = subscribeForm.phone.value;

        res.render('thankyouPage',{firstName:subscribeForm.firstName.value,lastName:subscribeForm.lastName.value})

        Transaction.commit()


    } catch (error) {
        Transaction.rollback();
        res.render('forms/subscribe',{subscribeForm:subscribeForm,emailerror:'Email is already subscribed'});
    }
}else{
    res.render('forms/subscribe',{subscribeForm:subscribeForm});

}

    next();
})




function validateEmail(email) {
	var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
	return regex.test(email);
}




module.exports = server.exports();