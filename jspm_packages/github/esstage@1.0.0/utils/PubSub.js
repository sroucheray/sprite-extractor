/* */ 
class PubSub {
    constructor() {
        this.handlers = [];
    }

    on(event, handler) {
        this.handlers.push({
            event: event,
            handler: handler
        });
    }

    trigger(event, data) {
        for (var i = 0; i < this.handlers.length; i++) {
            if (this.handlers[i].event === event) {
                this.handlers[i].handler.call(this, data);
            }
        }
    }
}

export default PubSub;