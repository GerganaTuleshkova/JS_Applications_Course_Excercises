import { deleteProduct, getProductById } from '../data/furnitureCalls.js';


export async function deleteView(ctx) {
    const productId = ctx.params.productId;

    const product = await getProductById(productId);

    let user = ctx.userData();

    if (user == null || (user != null && user.id != product._ownerId)) {
        alert('This is not your item');
        throw new Error('You are not authorized for this action');
    }


    if (confirm('Do you confirm you want to delete this beautiful piece of furniture from the catalog?')) {
        await deleteProduct(productId);

        ctx.page.redirect('/');
    }
}
