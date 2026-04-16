import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DesignGalleryComponent } from './components/design-gallery/design-gallery.component';
import { CustomDesignerComponent } from './components/custom-designer/custom-designer.component';
import { ARPreviewComponent } from './components/ar-preview/ar-preview.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'designgallery', component: DesignGalleryComponent },
  { path: 'customdesigner', component: CustomDesignerComponent, canActivate: [AuthGuard] },

  { path: 'arpreview/:id', component: ARPreviewComponent },

  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'orderhistory', component: OrderHistoryComponent, canActivate: [AuthGuard] },

  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}