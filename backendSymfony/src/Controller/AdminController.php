<?php

namespace App\Controller;

use App\Entity\Admin;
use App\Repository\ActualiteRepository;
use App\Repository\AdminRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class AdminController extends AbstractController
{
    
   /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var ActualiteRepository
     */
    
    private $actualiteRepository;
     /**
     * @var AdminRepository
     */
    private $adminRepository;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    



    public function __construct(EntityManagerInterface $entityManager, AdminRepository $adminRepository ,ActualiteRepository $actualiteRepository)
    {

        $this->adminRepository=$adminRepository;
        $this->actualiteRepository=$actualiteRepository;
        $this->entityManager=$entityManager;


    }

    public function signup(Request $request)
    {
        $admin = new Admin();
        $admin->setNom($request->request->get('nom'));
        $admin->setPrenom($request->request->get('prenom'));
        $admin->setEmail($request->request->get('email'));
        $admin->setRole($request->request->get('role'));
        $admin->setMotdepasse($request->request->get('motdepasse'));

        $this->entityManager->persist($admin);
        $this->entityManager->flush();

        return $this->json($admin,201,[],[
            'skip_null_values' => true,
            'ignored_attributes'=> ['__isInitialized__','actualites'],
        ]);

    }

    public function login(Request $request){
        $user =  $this->adminRepository->findOneBy(['email'=>$request->request->get('email'),'motdepasse'=>$request->request->get('motdepasse')]);
        return $this->json($user,200,[],[
            'skip_null_values' => true,
            'ignored_attributes'=> ['__isInitialized__','actualites'],
        ]);

    }

    public function updateInfo(Request $request, $id){
        $admin=$this->adminRepository->find($id);
        if($request->request->get("nom")){
            $admin->setNom($request->request->get("nom"));
        }
        if($request->request->get("prenom")){
            $admin->setPrenom($request->request->get("prenom"));
        }
        if($request->request->get("email")){
            $admin->setEmail($request->request->get("email"));
        }
        if($request->request->get("motdepasse")){
            $admin->setMotdepasse($request->request->get("motdepasse"));
        }
        $this->entityManager->flush();

        return $this->json($admin,200);

    }

    public function All_sub_admins()
    {
        $sous_admins = $this->adminRepository->findBy(['role'=>'sub_admin']);
        return $this->json($sous_admins,200,[],[
            'skip_null_values' => true,
            'ignored_attributes'=> ['__isInitialized__','modifiePar','comments','category','admin','contenu','image','nbvisiteurs','creePar','dateCreation','motdepasse','role'],
        ]);

    }

    public function all_admins()
    {
        $admins = $this->adminRepository->findBy(['role'=>'admin']);
        return $this->json($admins,200,[],[
            'skip_null_values' => true,
            'ignored_attributes'=> ['__isInitialized__','modifiePar','comments','category','admin','contenu','image','nbvisiteurs','creePar','dateCreation','motdepasse','role'],
        ]);
        
    }

    public function delete_Sous_Admin($id){
        $admin=$this->adminRepository->find($id);
        $this->entityManager->remove($admin);
        $this->entityManager->flush();
        return $this->json(['message'=>'sub admin deleted done !'],200);
    }


    
}
