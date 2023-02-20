//This query gets related tabs for the menu
export const menuGraphQuery = `{
    menu{
      topPromoBanner
      logo
      secondMenuTabs {
        menuTab{
          ...on menu-tab{
            title
            link
            slices{
              ...on menu_sub_tab{
                variation{
                  ...on default{
                    primary{
                      sectionTitle
                    }
                    items{
                      subSectionTitle
                      subSectionLink
                    }
                  }
                }
              }
            }
          }
        }
      }
      menuTabs{
        menuTab{
          ...on menu-tab{
            title
            link
            slices{
              ...on menu_sub_tab{
                variation{
                  ...on default{
                    primary{
                      sectionTitle
                    }
                    items{
                      subSectionTitle
                      subSectionLink
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
