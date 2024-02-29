document.addEventListener('DOMContentLoaded', function() {
    const blockSiteButton = document.getElementById('blockSite');
    const unblockSiteButton = document.getElementById('unblockSite');
    const siteInput = document.getElementById('siteInput');
    const blockedSitesElement = document.getElementById('blockedSites');
  
    function updateBlockedSitesUI() {
      const blockedSites = JSON.parse(localStorage.getItem('blockedSites') || '[]');
      blockedSitesElement.innerHTML = blockedSites.join(', ');
    }
  
    blockSiteButton.onclick = function() {
      const site = siteInput.value;
      if (site) {
        const blockedSites = JSON.parse(localStorage.getItem('blockedSites') || '[]');
        if (!blockedSites.includes(site)) {
          blockedSites.push(site);
          localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
          updateBlockedSitesUI();
        }
        siteInput.value = '';
      }
    };
  
    unblockSiteButton.onclick = function() {
      const site = siteInput.value;
      let blockedSites = JSON.parse(localStorage.getItem('blockedSites') || '[]');
      const index = blockedSites.indexOf(site);
      if (index > -1) {
        blockedSites.splice(index, 1);
        localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
        updateBlockedSitesUI();
      }
      siteInput.value = '';
    };
  
    updateBlockedSitesUI();
  });
  