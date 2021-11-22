const path = require(`path`)

exports.createPages = async ({graphql, actions, reporter}) => {
    const { createPage, createRedirect } = actions

    const yearTemplate = path.resolve(`./src/templates/yearTemplate.tsx`)

    const result = await graphql(
        `
        query Pages {
            allDataYaml {
                nodes {
                    year
                }
            }
        }
        `
    )

    if (result.errors) {
        reporter.panicOnBuild("ERROR!!!", result.errors)
        return
    }
    
    const pages = result.data.allDataYaml.nodes

    pages.forEach((page) => {
        createPage({
            path: ""+page.year,
            component: yearTemplate,
            context: {
                year: page.year
            },
        });
    })

    // createRedirect({
    //     fromPath: '/',
    //     toPath: '/2021',
    //     redirectInBrowser: true,
    //     isPermanent: true,
    // })
}

