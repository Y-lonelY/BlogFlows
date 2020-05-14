## 周围游动的边框特效

```css
  .noData,
  .noData::before,
  .noData::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .noData {
    width: 200px;
    height: 200px;
    margin: 20% auto;
    color: #ebe4ea;
    box-shadow: inset 0 0 0 1px rgba(235, 228, 234, 0.5);
  }
  .noData::before,
  .noData::after {
    content: '';
    z-index: -1;
    margin: -5%;
    box-shadow: inset 0 0 0 2px;
    animation: clipMe 8s linear infinite;
  }
  .noData::before {
    animation-delay: -4s;
  }
  @keyframes clipMe {
    0%,
    100% {
        clip: rect(0px, 220.0px, 2px, 0px);
    }
    25% {
        clip: rect(0px, 2px, 220.0px, 0px);
    }
    50% {
        clip: rect(218.0px, 220.0px, 220.0px, 0px);
    }
    75% {
        clip: rect(0px, 220.0px, 220.0px, 218.0px);
    }
  }
```