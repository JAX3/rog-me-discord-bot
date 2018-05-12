
module.exports = {
    name: 'username ',
    description: 'repeats the message ',
    permission: "224963691563581440",
    execute(message,args) {
        const sayMessage = args.join(" ");
        
        message.delete().catch(O_o=>{}); 
    
        client.user.setUsername(sayMessage);
        
    },
  };