const yong = {
  // 특정 속성과 자식노드를 가지는 요소 노드를 생성해서 반환
  // 예시: <button type="button" onclick="handleUp()">+</button> 을 만들려면
  // createElement('button', {type: 'button', onclick: 'handleUp()}, '+');
  createElement: (tag, props, ...children) => {
    // 요소 노드 생성
    const elem = document.createElement(tag);

    // 속성 추가
    if (props) {
      for (const attrName in props) {
        elem.setAttribute(attrName, props[attrName]);
      }
    }

    // 자식노드 추가
    for (let child of children) {
      if (typeof child === "string" || typeof child === "number") {
        child = document.createTextNode(child);
      }
      elem.appendChild(child);
    }

    return elem;
  },
};

export default yong;
