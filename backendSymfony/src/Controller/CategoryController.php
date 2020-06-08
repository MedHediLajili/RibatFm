<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\ActualiteRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CategoryController extends AbstractController
   {
    /**
     * @var CategoryRepository
     */
    private $categoryRepository;

    
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var ActualiteRepository
     */
    
    private $actualiteRepository;
  
    public function __construct(CategoryRepository $cateogryRepository , ActualiteRepository $actualiteRepository, EntityManagerInterface $entityManager)
    {

        $this->categoryRepository=$cateogryRepository;
        $this->actualiteRepository=$actualiteRepository;
        $this->entityManager=$entityManager;
    }



    public function getAllCategories(): JsonResponse
    {
      $categories=$this->categoryRepository->findAll();
          return $this->json($categories,200,[],[
              'skip_null_values' => true,
              'ignored_attributes'=> ['__isInitialized__','comments','admin','category','modifiePar','creePar','dateCreation','nbvisiteurs','image','contenu'],
          ]);
    }

    public function createCategory(Request $request): JsonResponse
    {
        $category= new Category();
        $category->setNomCategory($request->request->get("nomCategory"));
        $this->entityManager->persist($category);
        $this->entityManager->flush();
        return $this->json($category,201,[],[
            'skip_null_values' => true,
            'ignored_attributes'=> ['__isInitialized__'],
        ]);
        
    }

    public function updateCategory(Request $request,$idcategory){
        $category=$this->categoryRepository->find($idcategory);
        $category->setNomCategory($request->request->get("nomCategory"));
        $this->entityManager->flush();
        return $this->json($category,200);
        }

    public function showCategory(Request $request,$idcategory){
        $category=$this->categoryRepository->find($idcategory);
        return $this->json($category,200,[],[
            'skip_null_values' => true,
            'ignored_attributes'=> ['__isInitialized__', 'admin'],
        ]);

    }

    public function deleteCategory($idcategory)
{
    $category=$this->categoryRepository->find($idcategory);
    $this->entityManager->remove($category);
    $this->entityManager->flush();
    return $this->json(['message'=>'category deleted'],200);

}
   }