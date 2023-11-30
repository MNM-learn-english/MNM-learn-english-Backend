import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDocument, CategorySchema } from './model/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CrmCategoryController } from './controller/crm.category.controller';
import { PanelCategoryController } from './controller/panel.category.controller';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CategoryDocument.name, schema: CategorySchema}]),
  ],
  controllers: [CrmCategoryController, PanelCategoryController],
  providers: [CategoryService, CategoryRepository]

  
})
export class CategoryModule {}
