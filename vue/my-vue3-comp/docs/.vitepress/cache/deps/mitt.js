import "./chunk-DFKQJ226.js";

// ../node_modules/.pnpm/mitt@1.1.3/node_modules/mitt/dist/mitt.es.js
function mitt(all) {
  all = all || /* @__PURE__ */ Object.create(null);
  return {
    /**
     * Register an event handler for the given type.
     *
     * @param  {String} type	Type of event to listen for, or `"*"` for all events
     * @param  {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on: function on(type, handler) {
      (all[type] || (all[type] = [])).push(handler);
    },
    /**
     * Remove an event handler for the given type.
     *
     * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
     * @param  {Function} handler Handler function to remove
     * @memberOf mitt
     */
    off: function off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },
    /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * @param {String} type  The event type to invoke
     * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit: function emit(type, evt) {
      (all[type] || []).slice().map(function(handler) {
        handler(evt);
      });
      (all["*"] || []).slice().map(function(handler) {
        handler(type, evt);
      });
    }
  };
}
var mitt_es_default = mitt;
export {
  mitt_es_default as default
};
//# sourceMappingURL=mitt.js.map
