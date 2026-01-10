// main.js
// JS for Ye Zhang's Reading Notes

document.addEventListener('DOMContentLoaded', function () {
    // -----------------------------
    // 1. Category switching (left sidebar)
    // -----------------------------
    const summaries = document.querySelectorAll('.nav-summary');
    const sections = document.querySelectorAll('.post-list-section');
    const mainTitle = document.getElementById('main-title');
    const mainDescription = document.getElementById('main-description');
    const crumbCategory = document.getElementById('crumb-category');
  
    // 每个分类对应的一句话简介
    const descriptions = {
      all: 'A lightweight daily log of what I read, think, and try.',
      'multi-omics':
        'Notes on methods and ideas for integrating histology with transcriptomics, epigenomics, and other omics layers.',
      pathology:
        'Notes on computational pathology, including nuclei segmentation, diagnosis, and prognosis.',
      multimodal:
        'Notes on multimodal learning and foundation models for biology and pathology.'
    };
  
    // 显示某个分类
    function showCategory(category) {
      // 控制不同 section 显示/隐藏
      sections.forEach(section => {
        const cat = section.getAttribute('data-category');
        section.style.display = (cat === category) ? '' : 'none';
      });
  
      // 更新主标题和面包屑
      if (category === 'all') {
        mainTitle.textContent = 'All Notes · Daily Log';
        crumbCategory.textContent = 'All Notes';
      } else if (category === 'multi-omics') {
        mainTitle.textContent = 'Multi-omics';
        crumbCategory.textContent = 'Multi-omics';
      } else if (category === 'pathology') {
        mainTitle.textContent = 'Pathology';
        crumbCategory.textContent = 'Pathology';
      } else if (category === 'multimodal') {
        mainTitle.textContent = 'Multimodal & Foundation Models';
        crumbCategory.textContent = 'Multimodal & Foundation Models';
      }
  
      // 更新描述文字
      mainDescription.textContent = descriptions[category] || descriptions['all'];
  
      // 更新左侧激活态样式
      summaries.forEach(s => s.classList.remove('nav-summary-active'));
      const active = document.querySelector('.nav-summary[data-category="' + category + '"]');
      if (active) {
        active.classList.add('nav-summary-active');
  
        // 确保对应 details 是展开状态
        const parentDetails = active.closest('details');
        if (parentDetails) parentDetails.open = true;
      }
    }
  
    // 给左侧 summary 绑定点击事件
    summaries.forEach(summary => {
      summary.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        if (category) {
          // 用 setTimeout 避免和 details toggle 冲突
          setTimeout(() => showCategory(category), 0);
        }
      });
    });
  
    // 页面初始状态：展示 All Notes
    showCategory('all');
  
    // -----------------------------
    // 2. Share buttons (X / LinkedIn)
    // -----------------------------
    const pageUrl = window.location.href;
    const pageTitle = document.title || "Ye's Reading Notes";
  
    const xLink = document.getElementById('share-x');
    const linkedinLink = document.getElementById('share-linkedin');
  
    // X 分享链接
    if (xLink) {
      const text = pageTitle + ' - Reading notes';
      xLink.href =
        'https://x.com/intent/post?text=' +
        encodeURIComponent(text) +
        '&url=' +
        encodeURIComponent(pageUrl);
    }
  
    // LinkedIn 分享链接
    if (linkedinLink) {
      linkedinLink.href =
        'https://www.linkedin.com/sharing/share-offsite/?url=' +
        encodeURIComponent(pageUrl);
    }
  
    // -----------------------------
    // 3. Zhihu / RedNote / WeChat：复制链接
    // -----------------------------
    const copyButtons = document.querySelectorAll('.share-btn[data-platform]');
    const toast = document.getElementById('share-toast');
  
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pageUrl);
  
          if (toast) {
            const platform = btn.dataset.platform || 'this app';
            toast.textContent = 'Link copied, paste into ' + platform;
            toast.classList.add('show');
  
            setTimeout(() => {
              toast.classList.remove('show');
            }, 1600);
          } else {
            alert('Link copied. Paste into the app.');
          }
        } catch (err) {
          alert('Copy failed, please copy the URL manually.');
        }
      });
    });
  
    // -----------------------------
    // （4. 以后要加新功能可以继续写在这里）
    // -----------------------------
  });
  