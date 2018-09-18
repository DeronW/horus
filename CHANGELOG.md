# CHANGELOG

### 0.2.3

fix bug

get event context with ``innerText`` method, but **svg** element doesn't has this method.

### 0.2.2

fix bug

``setCookie`` 时, 设置到2个域名下, \*.domian.com 和 domain.com

### 0.2.1

fix Base64 encode bug, use `Base64.encodeURI` instead of `Base.encode`

### 0.2.0

refactory event data fields

add `eventName` , `eventType`
remove `mark`

### 0.1.9

fix bug

``$horus.occur('event type')``

### 0.1.8

主动上报消息时, 允许消息体为空, 只传入事件名称即可
