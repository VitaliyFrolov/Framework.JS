# Framework

### В рамках данного проекта был реализован базовый функционал примитивного JS фреймворка, а именно:
1. Виртуальный DOM
2. Реактивность
3. Хуки для работы с жизненным циклом компонента

## 1. Виртуальный DOM
- [VNode - виртуальная нода](./src/core/VNode/VNode.ts)
- [VDOM - виртуальный DOM](./src/core/VDOM/VDOM.ts)
- [RootComponent - корневой компонент](./src/core/Component/RootComponent.ts)

### Виртуальная нода
Виртуальная нода представляет собой класс, создающий узел DOM-дерева, представленный как объект JavaScript. Конструктор принимает следующие параметры:
- **tag**: строка, представляющая тег, который необходимо создать в данной ноде.
- **props**: объект свойств (properties), содержащий атрибуты и обработчики событий ноды.
- **children**: массив дочерних виртуальных нод или текстовых узлов.
- **$el**: ссылка на реальный DOM-элемент, соответствующий этой ноде.

### Виртуальный DOM
Виртуальный DOM является легковесной версией реального DOM, состоящей из виртуальных нод. Класс `VDOM` включает методы для управления жизненным циклом компонентов:
- **mount**: стадия монтирования, создающая реальный DOM-узел из виртуального узла и добавляющая его в контейнер.
- **update**: стадия обновления, сравнивающая старый и новый виртуальные узлы для минимизации изменений в реальном DOM.
- **unmount**: стадия размонтирования, удаляющая реальный DOM-узел, связанный с виртуальным узлом.

### Атрибуты и события
- Если свойство начинается с "on", например, `onClick`, оно интерпретируется как обработчик события и добавляется через `addEventListener`.
- Все остальные свойства добавляются через `setAttribute`.

### Дочерние узлы
- Если узел является строкой, создаётся текстовый узел.
- Если узел является другим `VNode`, рекурсивно вызывается метод `mount` для его монтирования.
- Если узел является функцией, создаётся текстовый узел, значение которого вычисляется реактивно через `WatchEffect`.

### Методы жизненного цикла
- **onMount**: вызывается после монтирования узла.
- **onUpdate**: вызывается после обновления узла.
- **onUnmount**: вызывается перед удалением узла.

## 2. Реактивность
Реактивность реализована с использованием класса `Dependency` и функции `WatchEffect`:
- **Dependency**: отслеживает зависимости, обновляя подписчиков при изменении данных.
- **WatchEffect**: позволяет отслеживать изменения реактивных данных и автоматически обновлять связанные DOM-элементы.

### Реактивный объект
Функция `reactive` оборачивает объект в `Proxy`, добавляя возможность отслеживания изменений его свойств. При чтении свойства создаётся зависимость, а при записи данных уведомляются подписки в Dependency.