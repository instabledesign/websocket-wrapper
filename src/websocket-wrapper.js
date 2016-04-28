(function(window){
    window.OverideWebsocket = function (override){
        var options = {
            presend: override.presend || function(data) {return data;},
            send: override.send || function(){},
            postsend: override.postsend || function(){},
            preclose: override.preclose || function(){},
            close: override.close || function(){},
            postclose: override.postclose || function(){},
            preopen: override.preopen || function(){},
            onopen: override.onopen || function(){},
            postopen: override.postopen || function(){},
            preclose: override.preclose || function(){},
            onclose: override.onclose || function(){},
            postclose: override.postclose || function(){},
            premessage: override.premessage || function(){},
            onmessage: override.onmessage || function(){},
            postmessage: override.postmessage || function(){},
            preerror: override.preerror || function(){},
            onerror: override.onerror || function(){},
            posterror: override.posterror || function(){},
        };
    
        window.oldWebSocket = WebSocket;
        window.WebSocket = function (path, protocol) {
            this.parent = new oldWebSocket(path, protocol||[]);

            Object.defineProperty(this, 'binaryType', {
                set: function(value) { this.parent.binaryType = value }.bind(this),
                get: function() { return this.parent.binaryType; }.bind(this)
            });

            Object.defineProperty(this, 'bufferedAmount', {
                get: function() { return this.parent.bufferedAmount; }.bind(this)
            });

            Object.defineProperty(this, 'extensions', {
                get: function() { return this.parent.extensions; }.bind(this)
            });

            Object.defineProperty(this, 'protocol', {
                get: function() { return this.parent.protocol; }.bind(this)
            });

            Object.defineProperty(this, 'readyState', {
                get: function() { return this.parent.readyState; }.bind(this)
            });

            Object.defineProperty(this, 'url', {
                set: function(value) { this.parent.url = value }.bind(this),
                get: function() { return this.parent.url; }.bind(this)
            });

            this.onopen = function(event){};
            this.onclose = function(event){};
            this.onmessage = function(event){};
            this.onerror = function(event){};

            this.send = function (data) {
                data = options.presend.call(this, data);
                this.parent.send(data);
                options.postsend.call(this, data);
            }.bind(this);

            this.close = function (code, reason) {
                options.preclose.call(this, data);
                this.parent.close(code, reason);
                options.postclose.call(this, data);
            }.bind(this);

            this.parent.onopen = function (event) {
                options.preopen.call(this, event);
                this.onopen.call(this, event);
                options.postopen.call(this, event);
            }.bind(this);

            this.parent.onclose = function (event) {
                options.preclose.call(this, event);
                this.onclose.call(this, event);
                options.postclose.call(this, event);
            }.bind(this);

            this.parent.onmessage = function (event) {
                options.premessage.call(this, event);
                this.onmessage.call(this, event);
                options.postmessage.call(this, event);
            }.bind(this);

            this.parent.onerror = function (event) {
                options.preerror.call(this, event);
                this.onerror.call(this, event);
                options.posterror.call(this, event);
            }.bind(this);

            return this;
        };
    }
})(window);
